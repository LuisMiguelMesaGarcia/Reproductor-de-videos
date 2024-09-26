using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiReproductorVideos.Migrations
{
    /// <inheritdoc />
    public partial class updatecontentplaystarttime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlayStart",
                table: "Contents",
                newName: "PlayStartTime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlayStartTime",
                table: "Contents",
                newName: "PlayStart");
        }
    }
}
