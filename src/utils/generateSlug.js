import uuid4 from "uuid4";
import slugify from "slugify";

export default function generateSlug(str) {
  const slug = slugify(str, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });

  return slug + "-" + uuid4().slice(0, 4) + uuid4().slice(-4);
}
