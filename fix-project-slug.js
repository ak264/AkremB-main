/*
This file serves as documentation for the fix needed in [...]slug.astro

The issue is that somewhere in the [...]slug.astro file, there's a call to
pubDate.toISOString() that's failing because pubDate isn't a properly formatted
Date object in some cases.

To fix this issue:

1. We added a safeISOString utility function in utils.js
2. You should update the [...slug].astro file to use this function instead of directly calling toISOString

Example replacement:
-  <time datetime={pubDate.toISOString()}>
+  <time datetime={safeISOString(pubDate)}>

Or when using the date in any other format:
-  {pubDate.toISOString().slice(0, 10)}
+  {safeISOString(pubDate).slice(0, 10)}

If you can't directly edit the [...slug].astro file, make sure to import the safeISOString function from utils.js in any component that handles dates.

import { safeISOString } from '../utils';
*/
