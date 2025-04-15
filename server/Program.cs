using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using server.Data;
using AutoMapper;



var builder = WebApplication.CreateBuilder(args);

// Load environment variables from the .env file
Env.Load();

// Add environment variables to configuration
builder.Configuration["DATABASE_SERVER"] = Environment.GetEnvironmentVariable("DATABASE_SERVER");
builder.Configuration["DATABASE_NAME"] = Environment.GetEnvironmentVariable("DATABASE_NAME");
builder.Configuration["DATABASE_USER"] = Environment.GetEnvironmentVariable("DATABASE_USER");
builder.Configuration["DATABASE_PASSWORD"] = Environment.GetEnvironmentVariable("DATABASE_PASSWORD");

// Build connection string from environment variables
var connectionString = $"Server={builder.Configuration["DATABASE_SERVER"]};Database={builder.Configuration["DATABASE_NAME"]};User Id={builder.Configuration["DATABASE_USER"]};Password={builder.Configuration["DATABASE_PASSWORD"]};TrustServerCertificate=True;";
builder.Configuration["ConnectionStrings:DefaultConnection"] = connectionString;

// Log the connection string (for debugging, remove in production)
Console.WriteLine($"Connection String: {connectionString}");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

// Configure DbContext with SQL Server and connection string
builder.Services.AddDbContext<ApplicationDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

var app = builder.Build();

// Enable Swagger in development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();  // Enable Swagger JSON endpoint
    app.UseSwaggerUI();  // Enable Swagger UI (interactive API documentation)
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.MapControllers();

app.Run();