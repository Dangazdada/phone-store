namespace API_Server.Services
{
 public interface IVnPayService
 {
  string CreatePaymentUrl(HttpContext context, PaymentRequest request);
  VnPaymentResponse VnPayExcute(IQueryCollection collections);
 }
}
