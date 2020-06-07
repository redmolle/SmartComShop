using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Auth.Lib;
using DAL;
using DAL.Customer;
using DAL.Order;
using DAL.User;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Order.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddScoped<IRepositoryContextFactory, RepositoryContextFactory>();
            services.AddScoped<IOrderRepository>(
                provider =>
                new OrderRepository(Configuration.GetConnectionString("DefaultConnection"),
                                      provider.GetService<IRepositoryContextFactory>())
            );
            services.AddScoped<IUserRepository>(
                provider =>
                new UserRepository(Configuration.GetConnectionString("DefaultConnection"),
                                      provider.GetService<IRepositoryContextFactory>())
            );
            services.AddScoped<ICustomerRepository>(
                provider =>
                new CustomerRepository(Configuration.GetConnectionString("DefaultConnection"),
                                      provider.GetService<IRepositoryContextFactory>())
            );

            JwtAuth.SetAuthService(services);
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options =>
            options.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}