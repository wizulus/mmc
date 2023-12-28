import Button from "./Button";
import { useTheme } from "../theme/useTheme";
import { useLevel } from "../theme/useLevel";
import { useThemeLevelData } from "../theme/useThemeLevelData";
import styles from "./BackButton.module.css";

function BackToBatch() {
    const { themeSlug } = useTheme();
    const { batchNumber, batch } = useLevel();

    return (
        <Button
            icon="arrow-left-inverted"
            iconPosition="left"
            to={`/${themeSlug}levels/${batchNumber}/`}
            inverted={true}
            classList={[styles.BackButton]}
        >
            Back to {batch.releaseDate.formatted}
        </Button>
    );
}

function BackToWeeks() {
    const { themeSlug } = useTheme();

    return (
        <Button
            icon="arrow-left-inverted"
            iconPosition="left"
            to={`/${themeSlug}levels/`}
            inverted={true}
            classList={[styles.BackButton]}
        >
            Back to Weeks
        </Button>
    );
}

function BackToWelcome() {
    const { themeSlug } = useTheme();

    return (
        <Button
            icon="arrow-left-inverted"
            iconPosition="left"
            to={`/${themeSlug}`}
            inverted={true}
            classList={[styles.BackButton]}
        >
            Back to Welcome
        </Button>
    );
}


const BackButton = () => {
    const { hasBatch, hasLevel } = useThemeLevelData();
    const { info: { isHome } } = useTheme();
    if (hasBatch && hasLevel)
        return <BackToBatch />
    else if (hasBatch)
        return <BackToWeeks />
    if (isHome)
        return null;
    return <BackToWelcome />
};

export { BackButton }