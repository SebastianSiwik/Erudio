using Microsoft.EntityFrameworkCore.Migrations;

namespace Erudio.Data.Migrations
{
    public partial class RemoveManyToMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RequestBookmarks",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RequestId = table.Column<int>(nullable: false)
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
                        name: "FK_RequestBookmarks_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TranslationLikes",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    TranslationId = table.Column<int>(nullable: false)
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
                        name: "FK_TranslationLikes_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RequestBookmarks_RequestId",
                table: "RequestBookmarks",
                column: "RequestId");

            migrationBuilder.CreateIndex(
                name: "IX_TranslationLikes_TranslationId",
                table: "TranslationLikes",
                column: "TranslationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RequestBookmarks");

            migrationBuilder.DropTable(
                name: "TranslationLikes");
        }
    }
}
