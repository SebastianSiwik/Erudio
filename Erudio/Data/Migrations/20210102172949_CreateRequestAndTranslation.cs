using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Erudio.Data.Migrations
{
    public partial class CreateRequestAndTranslation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLanguagesOfInterest_AspNetUsers_UserId1",
                table: "UserLanguagesOfInterest");

            migrationBuilder.DropForeignKey(
                name: "FK_UserNativeLanguages_AspNetUsers_UserId1",
                table: "UserNativeLanguages");

            migrationBuilder.AlterColumn<string>(
                name: "UserId1",
                table: "UserNativeLanguages",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId1",
                table: "UserLanguagesOfInterest",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LanguageName",
                table: "Languages",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LanguageCode",
                table: "Languages",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Requests",
                columns: table => new
                {
                    RequestId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AuthorId = table.Column<string>(nullable: false),
                    FromLanguageCode = table.Column<string>(nullable: false),
                    ToLanguageCode = table.Column<string>(nullable: false),
                    Text = table.Column<string>(nullable: false),
                    Context = table.Column<string>(nullable: true),
                    ContextImage = table.Column<byte[]>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Requests", x => x.RequestId);
                    table.ForeignKey(
                        name: "FK_Requests_AspNetUsers_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RequestBookmarks",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    RequestId = table.Column<int>(nullable: false),
                    UserId1 = table.Column<string>(nullable: true)
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
                name: "Translations",
                columns: table => new
                {
                    TranslationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RequestId = table.Column<int>(nullable: false),
                    AuthorId = table.Column<string>(nullable: false),
                    Text = table.Column<string>(nullable: false),
                    Explanation = table.Column<string>(nullable: true),
                    ExplanationImage = table.Column<byte[]>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Translations", x => x.TranslationId);
                    table.ForeignKey(
                        name: "FK_Translations_AspNetUsers_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Translations_Requests_RequestId",
                        column: x => x.RequestId,
                        principalTable: "Requests",
                        principalColumn: "RequestId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TranslationLikes",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    TranslationId = table.Column<int>(nullable: false),
                    UserId1 = table.Column<string>(nullable: true)
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

            migrationBuilder.CreateIndex(
                name: "IX_Languages_LanguageCode",
                table: "Languages",
                column: "LanguageCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RequestBookmarks_RequestId",
                table: "RequestBookmarks",
                column: "RequestId");

            migrationBuilder.CreateIndex(
                name: "IX_RequestBookmarks_UserId1",
                table: "RequestBookmarks",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_AuthorId",
                table: "Requests",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_TranslationLikes_TranslationId",
                table: "TranslationLikes",
                column: "TranslationId");

            migrationBuilder.CreateIndex(
                name: "IX_TranslationLikes_UserId1",
                table: "TranslationLikes",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Translations_AuthorId",
                table: "Translations",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Translations_RequestId",
                table: "Translations",
                column: "RequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserLanguagesOfInterest_AspNetUsers_UserId1",
                table: "UserLanguagesOfInterest",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserNativeLanguages_AspNetUsers_UserId1",
                table: "UserNativeLanguages",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLanguagesOfInterest_AspNetUsers_UserId1",
                table: "UserLanguagesOfInterest");

            migrationBuilder.DropForeignKey(
                name: "FK_UserNativeLanguages_AspNetUsers_UserId1",
                table: "UserNativeLanguages");

            migrationBuilder.DropTable(
                name: "RequestBookmarks");

            migrationBuilder.DropTable(
                name: "TranslationLikes");

            migrationBuilder.DropTable(
                name: "Translations");

            migrationBuilder.DropTable(
                name: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Languages_LanguageCode",
                table: "Languages");

            migrationBuilder.AlterColumn<string>(
                name: "UserId1",
                table: "UserNativeLanguages",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "UserId1",
                table: "UserLanguagesOfInterest",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "LanguageName",
                table: "Languages",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "LanguageCode",
                table: "Languages",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_UserLanguagesOfInterest_AspNetUsers_UserId1",
                table: "UserLanguagesOfInterest",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserNativeLanguages_AspNetUsers_UserId1",
                table: "UserNativeLanguages",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
