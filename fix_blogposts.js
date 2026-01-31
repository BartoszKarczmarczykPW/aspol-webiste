const fs = require('fs');
const path = 'src/data/blogPosts.ts';

try {
    let content = fs.readFileSync(path, 'utf8');

    // 1. Remove the pervasive " - " separator
    // It seems the pattern is " char - char - "
    // We'll replace " - " with "" globally.
    // Also handling potential edge cases at start/end
    content = content.replace(/ - /g, '');

    // Also clean up any leading/trailing dashes that might remain if they weren't part of a " - " group
    // But be careful not to remove actual dashes like in dates "2024-05-05".
    // The pattern was likely inserted between every char.

    // 2. Fix Double Encoding (Latin1 interpreted as UTF-8 then saved, or vice versa)
    // Common artifacts: Ã© for é, Ã¨ for è, etc.
    // We can try to decode it.
    // If the string is currently valid UTF-8 bytes viewed as Latin1 characters:

    // First, let's manually fix common ones observed to be safe:
    // Ã© -> é (C3 A9)
    // Ã¨ -> è (C3 A8)
    // Ã  -> à (C3 A0)
    // Ã¹ -> ù (C3 B9)
    // Ã¢ -> â (C3 A2)
    // Ãª -> ê (C3 AA)
    // Ã® -> î (C3 AE)
    // Ã´ -> ô (C3 B4)
    // Ã» -> û (C3 BB)
    // Ã« -> ë (C3 AB)
    // Ã¯ -> ï (C3 AF)
    // Ã¼ -> ü (C3 BC)
    // Ã§ -> ç (C3 A7)
    // Å‚ -> ł (C5 82)
    // Å„ -> ń (C5 84)
    // Å› -> ś (C5 9B)
    // Åº -> ź (C5 BA)
    // Å¼ -> ż (C5 BC)
    // Ä… -> ą (C4 85)
    // Ä™ -> ę (C4 99)
    // Ä‡ -> ć (C4 87)
    // Ã³ -> ó (C3 B3)

    // Punctuation
    // â€“ -> – (E2 80 93) (en-dash)
    // â€” -> — (E2 80 94) (em-dash)
    // â€™ -> ’ (E2 80 99) (right single quote/apostrophe)
    // â€œ -> “ (E2 80 9C)
    // â€ -> ” (E2 80 9D)
    // Â« -> « (C2 AB)
    // Â» -> » (C2 BB)

    // We can try a buffer roundtrip trick:
    // Convert current string to binary (latin1) then read as utf-8.
    // Only if the current string consists of correct UTF-8 bytes displayed as Latin1.
    // Given "Ã©" is two chars (Ã and ©), and in UTF-8 'é' is two bytes (C3 A9),
    // and Ã is C3 in Latin1, © is A9 in Latin1.
    // So yes, writing to buffer as dry binary/latin1 and reading as utf8 should work.

    const buffer = Buffer.from(content, 'binary');
    const fixedContent = buffer.toString('utf8');

    fs.writeFileSync(path, fixedContent);
    console.log('Successfully processed ' + path);
} catch (e) {
    console.error('Error:', e);
}
