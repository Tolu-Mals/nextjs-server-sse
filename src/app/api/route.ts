export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DURATION = 500;

const write = async (writer: WritableStreamDefaultWriter, data: string[]) => {
  const encoder = new TextEncoder();
  for (const chunk of data) {
    await new Promise((resolve) => setTimeout(resolve, DURATION));
    const encodedChunk = encoder.encode(`event:Event\ndata:${chunk}\n\n`);
    writer.write(encodedChunk);
  }

  writer.close();
};

const fullMessage = `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;
Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,
And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.
I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.`;

export const POST = async (req: Request) => {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

  write(
    writer,
    fullMessage
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
  );

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
};
