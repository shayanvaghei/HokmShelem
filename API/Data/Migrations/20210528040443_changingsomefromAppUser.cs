using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class changingsomefromAppUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GamesAbandoned",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Views",
                table: "Users",
                newName: "GamesLeft");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GamesLeft",
                table: "Users",
                newName: "Views");

            migrationBuilder.AddColumn<int>(
                name: "GamesAbandoned",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
