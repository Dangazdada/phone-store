using System;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using API_Server.Services;
using Microsoft.AspNetCore.Http;
using API_Server.Models;

namespace API_Server.Controllers
{
 [Route("api/[controller]")]
 [ApiController]
 public class VnPayController : ControllerBase
 {
  private readonly ILogger<VnPayController> _logger;
  private readonly IConfiguration _config;

  public VnPayController(ILogger<VnPayController> logger, IConfiguration config)
  {
   _logger = logger;
   _config = config;
  }

  [HttpPost("create-payment-url")]
  public IActionResult CreatePaymentUrl([FromBody] PaymentRequest request)
  {
   try
   {
    var vnpay = new VnPayLibrary();

    // Thêm các thông tin cần thiết vào yêu cầu thanh toán
    vnpay.AddRequestData("vnp_Version", _config["VnPay:Version"]);
    vnpay.AddRequestData("vnp_Command", _config["VnPay:Command"]);
    vnpay.AddRequestData("vnp_TmnCode", _config["VnPay:TmnCode"]); // Lấy từ cấu hình appsettings.json hoặc từ ENV
    vnpay.AddRequestData("vnp_Amount",( (request.Amount) * 100).ToString());
    vnpay.AddRequestData("vnp_CurrCode", _config["VnPay:CurrCode"]);
    vnpay.AddRequestData("vnp_OrderInfo", "Thanh toán cho đơn hàng:" +  request.OrderId);
    vnpay.AddRequestData("vnp_OrderType", "billpayment");
    vnpay.AddRequestData("vnp_Locale", _config["VnPay:Locale"]);
    vnpay.AddRequestData("vnp_ReturnUrl", _config["VnPay:ReturnUrl"]); // URL callback khi thanh toán thành công hoặc thất bại
    vnpay.AddRequestData("vnp_CreateDate", request.CreateDate.ToString("yyyyMMddHHmmss"));
    vnpay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress(HttpContext));
    vnpay.AddRequestData("vnp_TxnRef", DateTime.UtcNow.Ticks.ToString()) ;

    var paymentUrl = vnpay.CreateRequestUrl(_config["VnPay:BaseUrl"], _config["VnPay:HashSecret"]);

    return Ok(new { PaymentUrl = paymentUrl });
   }
   catch (Exception ex)
   {
    _logger.LogError(ex, "Error creating VNPay payment URL");
    return StatusCode(500, "Internal server error");
   }
  }

  [HttpPost("callback")]
  public IActionResult VNPayCallback()
  {
   try
   {
    var collections = HttpContext.Request.Query;

    // Xử lý phản hồi từ VNPay bằng cách gọi phương thức VnPayExcute
    var responseModel = VnPayExcute(collections);

    // Kiểm tra và xử lý kết quả thanh toán
    if (responseModel.Success)
    {
     // Thanh toán thành công, xử lý logic của bạn ở đây
     _logger.LogInformation($"Payment successful for order {responseModel.OrderId}");
    }
    else
    {
     // Thanh toán không thành công, xử lý logic của bạn ở đây
     _logger.LogError($"Payment failed for order {responseModel.OrderId}");
    }

    return Ok();
   }
   catch (Exception ex)
   {
    _logger.LogError(ex, "Error processing VNPay callback");
    return StatusCode(500, "Internal server error");
   }
  }

  private VnPaymentResponse VnPayExcute(IQueryCollection collections)
  {
   var vnpay = new VnPayLibrary();

   foreach (var (key, value) in collections)
   {
    if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
    {
     vnpay.AddRequestData(key, value.ToString());
    }
   }

   var vnp_OrderId = Convert.ToInt64(vnpay.GetResponseData("vnp_TxnRef"));
   var vnp_TransactionId = Convert.ToInt64(vnpay.GetResponseData("vnp_TransactionNo"));
   var vnp_SecureHash = collections.FirstOrDefault(p => p.Key == "vnp_SecureHash").Value;
   var vnp_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
   var vnp_OrderInfo = vnpay.GetResponseData("vnp_OrderInfo");

   bool checkSignature = vnpay.ValidateSignature(vnp_SecureHash, _config["VnPay:HashSecret"]);

   if (!checkSignature)
   {
    return new VnPaymentResponse { Success = false };
   }

   return new VnPaymentResponse
   {
    Success = true,
    PaymentMethod = "VnPay",
    OrderDescription = vnp_OrderInfo,
    OrderId = vnp_OrderId.ToString(),
    TransactionId = vnp_TransactionId.ToString(),
    Token = vnp_SecureHash,
    VnPayResponseCode = vnp_ResponseCode
   };
  }
  [HttpPost("vnpay-callback")]
  public IActionResult VnPayCallback([FromQuery] IQueryCollection queryParameters)
  {
   try
   {
    // Lấy các tham số từ query string và xử lý
    var responseModel = VnPayExcute(queryParameters);

    if (responseModel.Success)
    {
     // Xử lý thành công, có thể lưu trạng thái thanh toán vào CSDL và trả về kết quả cho frontend
     return Ok(new { Message = "Payment successful", Data = responseModel });
    }
    else
    {
     // Xử lý thất bại, có thể ghi log và trả về thông báo lỗi cho frontend
     return BadRequest(new { Message = "Payment failed" });
    }
   }
   catch (Exception ex)
   {
    // Xử lý các lỗi ngoại lệ
    _logger.LogError(ex, "Error processing VnPay callback");
    return StatusCode(500, "Internal server error");
   }

  }
 }
}
