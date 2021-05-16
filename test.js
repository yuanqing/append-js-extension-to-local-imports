import test from 'ava'
import { replace } from './index.js'

test('non-local import', function (t) {
  t.deepEqual(replace("import foo from 'foo'\n"), "import foo from 'foo'\n")
  t.deepEqual(
    replace("import { foo } from 'foo'\n"),
    "import { foo } from 'foo'\n"
  )
  t.deepEqual(
    replace("import { foo, bar } from 'foo'\n"),
    "import { foo, bar } from 'foo'\n"
  )
  t.deepEqual(
    replace(`import {
  foo,
  bar
} from 'foo'\n`),
    `import {
  foo,
  bar
} from 'foo'\n`
  )
})

test('local import - single line', function (t) {
  t.deepEqual(
    replace("import foo from './foo'\n"),
    "import foo from './foo.js'\n"
  )
  t.deepEqual(
    replace("import foo from '../foo'\n"),
    "import foo from '../foo.js'\n"
  )
  t.deepEqual(
    replace("import foo from '../../foo'\n"),
    "import foo from '../../foo.js'\n"
  )
  t.deepEqual(
    replace("import { foo } from './foo'\n"),
    "import { foo } from './foo.js'\n"
  )
  t.deepEqual(
    replace("import { foo } from '../foo'\n"),
    "import { foo } from '../foo.js'\n"
  )
  t.deepEqual(
    replace("import { foo } from '../../foo'\n"),
    "import { foo } from '../../foo.js'\n"
  )
  t.deepEqual(
    replace("import { foo, bar } from './foo'\n"),
    "import { foo, bar } from './foo.js'\n"
  )
  t.deepEqual(
    replace("import { foo, bar } from '../foo'\n"),
    "import { foo, bar } from '../foo.js'\n"
  )
  t.deepEqual(
    replace("import { foo, bar } from '../../foo'\n"),
    "import { foo, bar } from '../../foo.js'\n"
  )
})

test('local import - multiple lines', function (t) {
  t.deepEqual(
    replace(`import {
  foo,
  bar
} from './foo'\n`),
    `import {
  foo,
  bar
} from './foo.js'\n`
  )
  t.deepEqual(
    replace(`import {
  foo,
  bar
} from '../foo'\n`),
    `import {
  foo,
  bar
} from '../foo.js'\n`
  )
  t.deepEqual(
    replace(`import {
  foo,
  bar
} from '../../foo'\n`),
    `import {
  foo,
  bar
} from '../../foo.js'\n`
  )
})

test('local import - already has `.js` extension', function (t) {
  t.deepEqual(
    replace("import foo from './foo.js'\n"),
    "import foo from './foo.js'\n"
  )
  t.deepEqual(
    replace("import foo from '../foo.js'\n"),
    "import foo from '../foo.js'\n"
  )
  t.deepEqual(
    replace("import foo from '../../foo.js'\n"),
    "import foo from '../../foo.js'\n"
  )
  t.deepEqual(
    replace("import { foo } from './foo.js'\n"),
    "import { foo } from './foo.js'\n"
  )
  t.deepEqual(
    replace("import { foo } from '../foo.js'\n"),
    "import { foo } from '../foo.js'\n"
  )
  t.deepEqual(
    replace("import { foo } from '../../foo.js'\n"),
    "import { foo } from '../../foo.js'\n"
  )
  t.deepEqual(
    replace("import { foo, bar } from './foo.js'\n"),
    "import { foo, bar } from './foo.js'\n"
  )
  t.deepEqual(
    replace("import { foo, bar } from '../foo.js'\n"),
    "import { foo, bar } from '../foo.js'\n"
  )
  t.deepEqual(
    replace("import { foo, bar } from '../../foo.js'\n"),
    "import { foo, bar } from '../../foo.js'\n"
  )
  t.deepEqual(
    replace(`import {
  foo,
  bar
} from './foo.js'\n`),
    `import {
  foo,
  bar
} from './foo.js'\n`
  )
  t.deepEqual(
    replace(`import {
  foo,
  bar
} from '../foo.js'\n`),
    `import {
  foo,
  bar
} from '../foo.js'\n`
  )
  t.deepEqual(
    replace(`import {
  foo,
  bar
} from '../../foo.js'\n`),
    `import {
  foo,
  bar
} from '../../foo.js'\n`
  )
})

test('local import - multiple matches', function (t) {
  t.deepEqual(
    replace(`import foo from 'foo'
import bar from './bar'
import {
  qux,
  quux
} from './baz'\n`),
    `import foo from 'foo'
import bar from './bar.js'
import {
  qux,
  quux
} from './baz.js'\n`
  )
})
