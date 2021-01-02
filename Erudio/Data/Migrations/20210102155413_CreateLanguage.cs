using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Erudio.Data.Migrations
{
    public partial class CreateLanguage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<byte[]>(
                name: "ProfilePicture",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RegistrationDate",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "Languages",
                columns: table => new
                {
                    LanguageId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LanguageCode = table.Column<string>(nullable: true),
                    LanguageName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Languages", x => x.LanguageId);
                });

            migrationBuilder.CreateTable(
                name: "UserLanguagesOfInterest",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    LanugageId = table.Column<int>(nullable: false),
                    UserId1 = table.Column<string>(nullable: true),
                    LanguageId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLanguagesOfInterest", x => new { x.UserId, x.LanugageId });
                    table.ForeignKey(
                        name: "FK_UserLanguagesOfInterest_Languages_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "Languages",
                        principalColumn: "LanguageId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserLanguagesOfInterest_AspNetUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserNativeLanguages",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    LanugageId = table.Column<int>(nullable: false),
                    UserId1 = table.Column<string>(nullable: true),
                    LanguageId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserNativeLanguages", x => new { x.UserId, x.LanugageId });
                    table.ForeignKey(
                        name: "FK_UserNativeLanguages_Languages_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "Languages",
                        principalColumn: "LanguageId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserNativeLanguages_AspNetUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserLanguagesOfInterest_LanguageId",
                table: "UserLanguagesOfInterest",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLanguagesOfInterest_UserId1",
                table: "UserLanguagesOfInterest",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_UserNativeLanguages_LanguageId",
                table: "UserNativeLanguages",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_UserNativeLanguages_UserId1",
                table: "UserNativeLanguages",
                column: "UserId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserLanguagesOfInterest");

            migrationBuilder.DropTable(
                name: "UserNativeLanguages");

            migrationBuilder.DropTable(
                name: "Languages");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RegistrationDate",
                table: "AspNetUsers");
        }
    }
}
