import { Card } from "../../../components/Card";

export const Ymm5CreditsTrailerCard = (props: React.ComponentProps<typeof Card>) => {
  return (
    <Card subHeading={`Trailers`} {...props}>
      <dl>
        <dt>Script, visuals & edit</dt>
        <dd>Lektor</dd>

        <dt>Voice & script</dt>
        <dd>DuffyWeber</dd>

        <dt>Video capture</dt>
        <dd>DTSpies</dd>
        <dd>Kiavik</dd>

        <dt>Stills capture & cool ideas</dt>
        <dd>Paxsman</dd>

        <dt>Music</dt>
        <dd>Qumu</dd>
      </dl>
      <p>{`Special thanks to Kiavik and Lektor Jr. (a.k.a. Liam)`}</p>
    </Card>
  );
};
