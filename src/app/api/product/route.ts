import { NextResponse } from "next/server";

import { dbConnect } from "@/lib/mongodb";
import { ProductSettings } from "@/lib/models/product-settings";
import { defaultProductContent, normalizeProductContent } from "@/lib/product-content";

export async function GET() {
  try {
    await dbConnect();
    const settings = await ProductSettings.findOne({}).sort({ updatedAt: -1 }).lean();

    return NextResponse.json({ success: true, product: normalizeProductContent(settings ?? defaultProductContent) }, { status: 200 });
  } catch {
    return NextResponse.json({ success: true, product: defaultProductContent }, { status: 200 });
  }
}
