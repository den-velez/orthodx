import { NextRequest, NextResponse } from "next/server";
import { newPurchase } from "@/lib/actions/actions";
import { INewPurchase } from "@/interfaces";

export async function POST(req: NextRequest, res: NextResponse) {
  let payload: INewPurchase | null = null;
  let purchaseCreated; // Declare the purchaseCreated variable here

  try {
    payload = req ? await req.json() : null;

    if (payload) {
      purchaseCreated = await newPurchase(payload);
    }

    return NextResponse.json(purchaseCreated);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}
