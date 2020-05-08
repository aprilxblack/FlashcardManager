using Microsoft.EntityFrameworkCore.Migrations;

namespace FlashcardManager.DataAccess.Migrations
{
    public partial class AddSetToDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "LastOpenedSetId",
                table: "User",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateTable(
                name: "Set",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    UserID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Set", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Set_User_UserID",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_LastOpenedSetId",
                table: "User",
                column: "LastOpenedSetId",
                unique: true,
                filter: "[LastOpenedSetId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Set_UserID",
                table: "Set",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Set_LastOpenedSetId",
                table: "User",
                column: "LastOpenedSetId",
                principalTable: "Set",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Set_LastOpenedSetId",
                table: "User");

            migrationBuilder.DropTable(
                name: "Set");

            migrationBuilder.DropIndex(
                name: "IX_User_LastOpenedSetId",
                table: "User");

            migrationBuilder.AlterColumn<int>(
                name: "LastOpenedSetId",
                table: "User",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
