using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class SomeWork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoleSet",
                table: "User");

            migrationBuilder.AddColumn<Guid>(
                name: "Cusomer_Id",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Customer_Id",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsManager",
                table: "User",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_User_Cusomer_Id",
                table: "User",
                column: "Cusomer_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Customer_Cusomer_Id",
                table: "User",
                column: "Cusomer_Id",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Customer_Cusomer_Id",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_Cusomer_Id",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Cusomer_Id",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Customer_Id",
                table: "User");

            migrationBuilder.DropColumn(
                name: "IsManager",
                table: "User");

            migrationBuilder.AddColumn<string>(
                name: "RoleSet",
                table: "User",
                type: "text",
                nullable: true);
        }
    }
}
