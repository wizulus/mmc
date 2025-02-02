import Button from "../../../components/Button";
import { Card } from "../../../components/Card";


export const Ymm5ContentCreatorCard = () => (
  <Card
    heading={`Content creator?`}
    subHeading={`We have readied a Drive folder for you.`}
  >
    <p>
      Here you will find visual elements from the project: Logos, illustrations
      and other goodies. These are free to use for thumbnails, video overlays
      and other purposes.
    </p>
    <Button
      icon="folder"
      to="https://drive.google.com/drive/folders/1XyDe_a-6EtSVUvS4Clk0V5oK5PXg6q8i"
    >
      Open folder
    </Button>
  </Card>
);