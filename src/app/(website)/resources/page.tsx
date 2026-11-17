import { redirect } from "next/navigation";

/** The guides are listed on the Initiatives page. */
export default function ResourcesIndex() {
  redirect("/initiatives#resources");
}
