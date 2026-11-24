export const dynamic = "force-dynamic";

import { goToMatch } from "@/db";

export default async function JoinMatch({
   params,
   }: {
    params: Promise<{ match: string }>;
}) {
    const { match } = await params;

    await goToMatch(match);

}

