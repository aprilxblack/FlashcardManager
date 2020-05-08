using Microsoft.EntityFrameworkCore.Migrations;

namespace FlashcardManager.DataAccess.Migrations
{
    public partial class AlterUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LastOpenedSetId",
                table: "User",
                nullable: true,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastOpenedSetId",
                table: "User");
        }
    }
}
