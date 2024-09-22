using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
//using API_Server.Models.Momo;
using System.Configuration;
using Microsoft.Extensions.DependencyInjection; // Thêm dòng này
using Microsoft.Extensions.Configuration; // 
using System.Text.Json.Serialization;
using API_Server.Services;
//using API_Server.Models.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddDbContext<APIServerContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("APIServerContext") ??
throw new InvalidOperationException("Connection string 'APIServerContext' not found.")));
//// Đọc các tùy chọn từ appsettings.json
//builder.Services.Configure<MomoOptionModel>(builder.Configuration.GetSection("MomoAPI"));
// Đọc các tùy chọn từ appsettings.json và bind vào đối tượng momoOptions
//config cho Identity

// File upload max size, these settings will take effect on all APIs
builder.Services.Configure<Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions>(options =>
{
    options.Limits.MaxRequestBodySize = 1_000_000; // if don't set default value is: 30 MB
});
builder.Services.Configure<Microsoft.AspNetCore.Http.Features.FormOptions>(x =>
{
    x.ValueLengthLimit = 1_000_000;
    x.MultipartBodyLengthLimit = 1_000_000; // if don't set default value is: 128 MB
    x.MultipartHeadersLengthLimit = 1_000_000;
});


builder.Services.AddIdentity<User, IdentityRole>()
            .AddEntityFrameworkStores<APIServerContext>()
            .AddDefaultTokenProviders();

//config cho  Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

})
//config cho JWT
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
    };
});
builder.Services.AddControllers();



//config CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddHttpContextAccessor();

builder.Services.AddDistributedMemoryCache();

// httpClient 
builder.Services.AddHttpClient();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors();

app.UseAuthentication();



app.UseAuthorization();

app.UseSession();

app.MapControllers();

app.Run();
