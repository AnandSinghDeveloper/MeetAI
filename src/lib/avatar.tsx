import { createAvatar } from "@dicebear/core";
import { initials, botttsNeutral } from "@dicebear/collection";

interface Props {
  seed: string;
  varient: "initials" | "botttsNeutral";
}

export const genrateAvatarUri = ({ seed, varient }: Props) => {
  let avatar;

  if (varient === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, { seed });
  } else {
    avatar = createAvatar(initials, { seed, fontWeight: 500, fontSize: 42 });
  }

  return avatar.toDataUri();
};
