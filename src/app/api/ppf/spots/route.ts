import { NextResponse } from "next/server";
import { getPPFRegistrationCounts } from "@/lib/google-sheets";

const MAX_FRIDAY = 70;
const MAX_SATURDAY = 300;

export async function GET() {
  try {
    const counts = await getPPFRegistrationCounts();

    const fridaySpotsLeft = MAX_FRIDAY - counts.totalFriday;
    const saturdaySpotsLeft = MAX_SATURDAY - counts.totalSaturday;

    return NextResponse.json({
      friday: {
        total: MAX_FRIDAY,
        registered: counts.totalFriday,
        spotsLeft: Math.max(0, fridaySpotsLeft),
      },
      saturday: {
        total: MAX_SATURDAY,
        registered: counts.totalSaturday,
        spotsLeft: Math.max(0, saturdaySpotsLeft),
      },
      isOpen:
        process.env.PPF_REGISTRATION_OPEN !== "false" && saturdaySpotsLeft > 0,
    });
  } catch (error) {
    console.error("Error fetching PPF spots:", error);

    // Return default data so the form still renders
    return NextResponse.json({
      friday: { total: MAX_FRIDAY, registered: 0, spotsLeft: MAX_FRIDAY },
      saturday: { total: MAX_SATURDAY, registered: 0, spotsLeft: MAX_SATURDAY },
      isOpen: process.env.PPF_REGISTRATION_OPEN !== "false",
    });
  }
}
