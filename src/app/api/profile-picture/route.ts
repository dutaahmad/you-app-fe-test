import { writeFile, access } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { constants } from "fs";
import { auth } from "@/lib/auth";

const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const extensions = ["jpg", "jpeg", "png"];
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    let foundFile: string | null = null;

    for (const ext of extensions) {
        const possibleFile = path.join(uploadsDir, `${session.user?.email}.${ext}`);
        try {
            await access(possibleFile, constants.F_OK);
            foundFile = `/uploads/${session.user?.email}.${ext}`;
            break;
        } catch {
            continue;
        }
    }

    if (!foundFile) {
        return NextResponse.json({ error: "Profile picture not found" }, { status: 404 });
    }

    return NextResponse.json({ fileUrl: foundFile });
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!allowedMimeTypes.includes(file.type)) {
        return NextResponse.json(
            { error: "Invalid file type. Only jpeg, jpg, or png allowed." },
            { status: 400 }
        );
    }

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const extension = file.name.split(".").pop();
    const fileName = `${session.user?.email}.${extension}`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadsDir, fileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    return NextResponse.json({ message: "Uploaded successfully", fileName });
}