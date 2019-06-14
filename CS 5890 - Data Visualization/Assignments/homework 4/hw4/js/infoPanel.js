/** Class implementing the infoPanel view. */
class InfoPanel {
  /**
   * Creates a infoPanel Object
   */
  constructor() {
  }

  /**
   * Update the info panel to show info about the currently selected world cup
   * @param oneWorldCup the currently selected world cup
   */
  updateInfo(oneWorldCup) {
    document.getElementById("edition").innerHTML = oneWorldCup.edition;

    document.getElementById("host").innerHTML = oneWorldCup.host;

    document.getElementById("winner").innerHTML = oneWorldCup.winner;

    document.getElementById("silver").innerHTML = oneWorldCup.silver;

    let teamHTML = `<ul>`;
    oneWorldCup.teams_names.forEach(team_name => {
      teamHTML += `<li>` + team_name + `</li>`;
    });
    teamHTML += `</ul>`;

    document.getElementById("teams").innerHTML = teamHTML;
  }
}
