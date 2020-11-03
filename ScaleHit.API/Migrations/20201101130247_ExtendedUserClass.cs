using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ScaleHit.API.Migrations
{
    public partial class ExtendedUserClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EditorType",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastEnter",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Organization",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PlanStarted",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "RegisterTime",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "Scales",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ScaleTitle = table.Column<string>(nullable: true),
                    ScaleType = table.Column<string>(nullable: true),
                    PointsValue = table.Column<string>(nullable: true),
                    MaxPoint = table.Column<string>(nullable: true),
                    MinPoint = table.Column<string>(nullable: true),
                    ScaleCode = table.Column<int>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: false),
                    IsPublish = table.Column<bool>(nullable: false),
                    IsLive = table.Column<bool>(nullable: false),
                    IsLinearNavigation = table.Column<bool>(nullable: false),
                    ScaleTopic = table.Column<string>(nullable: true),
                    IsArchive = table.Column<bool>(nullable: false),
                    GradeType = table.Column<string>(nullable: true),
                    PointsXml = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Scales_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Scales_UserId",
                table: "Scales",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Scales");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EditorType",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastEnter",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Organization",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PlanStarted",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RegisterTime",
                table: "Users");
        }
    }
}
