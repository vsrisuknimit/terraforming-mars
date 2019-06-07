
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class AdaptationTechnology implements IProjectCard {
    public cost: number = 12;
    public tags: Array<Tags> = [Tags.SCIENCE];
    public name: string = "Adaptation Technology";
    public cardType: CardType = CardType.ACTIVE;
    public text: string = "Your global requirements are +2 or -2 steps, your choice in each case";
    public description: string = "Pushing the limits of the possible";
    public canPlay(): boolean {
        return true;
    }
    public getRequirementBonus(): boolean {
        return true;
    }
    public play(player: Player, _game: Game) {
        player.victoryPoints++;
        return undefined;
    }
}
