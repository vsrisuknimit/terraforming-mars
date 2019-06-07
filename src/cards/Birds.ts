
import { IActionCard } from "./ICard";
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { SelectPlayer } from "../inputs/SelectPlayer";

export class Birds implements IActionCard, IProjectCard {
    public cost: number = 10;
    public tags: Array<Tags> = [Tags.ANIMAL];
    public name: string = "Birds";
    public animals: number = 0;
    public cardType: CardType = CardType.ACTIVE;
    public actionText: string = "Add an animal to this card.";
    public text: string = "Requires 13% oxygen. Decrease any plant production 2 steps. Gain 1 victory point for each animal on this card.";
    public description: string = "Bringing life to the skies.";
    public canPlay(player: Player, game: Game): boolean {
        return game.getOxygenLevel() >= 13 - player.getRequirementsBonus(game);
    }
    public play(player: Player, game: Game) {
        return new SelectPlayer(game.getPlayers(), "Select player to decrease plant production 2 steps", (foundPlayer: Player) => {
            if (foundPlayer.plantProduction < 2) {
                throw "Player needs at least 2 plant production";
            }
            foundPlayer.plantProduction -= 2;
            game.addGameEndListener(() => {
                player.victoryPoints += this.animals;
            });
            return undefined;
        });
    }
    public canAct(): boolean {
        return true;
    }
    public action() {
        this.animals++;
        return undefined;
    }
}
