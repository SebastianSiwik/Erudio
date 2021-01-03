using Microsoft.EntityFrameworkCore.Migrations;

namespace Erudio.Data.Migrations
{
    public partial class ChangeDataTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_AspNetUsers_AuthorId",
                table: "Requests");

            migrationBuilder.DropForeignKey(
                name: "FK_Translations_AspNetUsers_AuthorId",
                table: "Translations");

            migrationBuilder.DropForeignKey(
                name: "FK_Translations_Requests_RequestId",
                table: "Translations");

            migrationBuilder.DropTable(
                name: "RequestBookmarks");

            migrationBuilder.DropTable(
                name: "TranslationLikes");

            migrationBuilder.DropTable(
                name: "UserLanguagesOfInterest");

            migrationBuilder.DropTable(
                name: "UserNativeLanguages");

            migrationBuilder.DropIndex(
                name: "IX_Translations_AuthorId",
                table: "Translations");

            migrationBuilder.DropIndex(
                name: "IX_Requests_AuthorId",
                table: "Requests");

            migrationBuilder.AlterColumn<string>(
                name: "AuthorId",
                table: "Translations",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "AuthorId",
                table: "Requests",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Translations_Requests_RequestId",
                table: "Translations",
                column: "RequestId",
                principalTable: "Requests",
                principalColumn: "RequestId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Translations_Requests_RequestId",
                table: "Translations");

            migrationBuilder.AlterColumn<string>(
                name: "AuthorId",
                table: "Translations",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "AuthorId",
                table: "Requests",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.CreateTable(
                name: "RequestBookmarks",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RequestId = table.Column<int>(type: "int", nullable: false),
                    UserId1 = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestBookmarks", x => new { x.UserId, x.RequestId });
                    table.ForeignKey(
                        name: "FK_RequestBookmarks_Requests_RequestId",
                        column: x => x.RequestId,
                        principalTable: "Requests",
                        principalColumn: "RequestId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RequestBookmarks_AspNetUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TranslationLikes",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TranslationId = table.Column<int>(type: "int", nullable: false),
                    UserId1 = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TranslationLikes", x => new { x.UserId, x.TranslationId });
                    table.ForeignKey(
                        name: "FK_TranslationLikes_Translations_TranslationId",
                        column: x => x.TranslationId,
                        principalTable: "Translations",
                        principalColumn: "TranslationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TranslationLikes_AspNetUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserLanguagesOfInterest",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LanugageId = table.Column<int>(type: "int", nullable: false),
                    LanguageId = table.Column<int>(type: "int", nullable: true),
                    UserId1 = table.Column<string>(type: "nvarchar(450)", nullable: false)
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
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserNativeLanguages",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LanugageId = table.Column<int>(type: "int", nullable: false),
                    LanguageId = table.Column<int>(type: "int", nullable: true),
                    UserId1 = table.Column<string>(type: "nvarchar(450)", nullable: false)
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
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Translations_AuthorId",
                table: "Translations",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_AuthorId",
                table: "Requests",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_RequestBookmarks_RequestId",
                table: "RequestBookmarks",
                column: "RequestId");

            migrationBuilder.CreateIndex(
                name: "IX_RequestBookmarks_UserId1",
                table: "RequestBookmarks",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_TranslationLikes_TranslationId",
                table: "TranslationLikes",
                column: "TranslationId");

            migrationBuilder.CreateIndex(
                name: "IX_TranslationLikes_UserId1",
                table: "TranslationLikes",
                column: "UserId1");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_AspNetUsers_AuthorId",
                table: "Requests",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Translations_AspNetUsers_AuthorId",
                table: "Translations",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Translations_Requests_RequestId",
                table: "Translations",
                column: "RequestId",
                principalTable: "Requests",
                principalColumn: "RequestId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
