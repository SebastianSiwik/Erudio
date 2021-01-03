using Microsoft.EntityFrameworkCore.Migrations;

namespace Erudio.Data.Migrations
{
    public partial class AddNativeLanguagesAndLanugagesOfInterest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LanguagesOfInterest",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    Id = table.Column<int>(nullable: false),
                    LanguageCode = table.Column<string>(nullable: false),
                    ApplicationUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LanguagesOfInterest", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_LanguagesOfInterest_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NativeLanguages",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    Id = table.Column<int>(nullable: false),
                    LanguageCode = table.Column<string>(nullable: false),
                    ApplicationUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NativeLanguages", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_NativeLanguages_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LanguagesOfInterest_ApplicationUserId",
                table: "LanguagesOfInterest",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_NativeLanguages_ApplicationUserId",
                table: "NativeLanguages",
                column: "ApplicationUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LanguagesOfInterest");

            migrationBuilder.DropTable(
                name: "NativeLanguages");
        }
    }
}
