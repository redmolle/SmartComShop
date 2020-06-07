using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Auth.Lib;
using DAL;
using DAL.Catalog;
using DAL.Customer;
using DAL.Order;
using DAL.OrderItem;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Cart.API
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
            services.AddScoped<IOrderItemRepository>(
                provider =>
                new OrderItemRepository(Configuration.GetConnectionString("DefaultConnection"),
                                      provider.GetService<IRepositoryContextFactory>())
            );
            services.AddScoped<ICustomerRepository>(
                provider =>
                new CustomerRepository(Configuration.GetConnectionString("DefaultConnection"),
                                      provider.GetService<IRepositoryContextFactory>())
            );

            services.AddScoped<ICatalogRepository>(
                provider =>
                new CatalogRepository(Configuration.GetConnectionString("DefaultConnection"),
                                      provider.GetService<IRepositoryContextFactory>())
            );

            JwtAuth.SetAuthService(services);
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
