# @frani/values-object

TypeScript library of **value objects** for validating Brazilian documents. It encapsulates formatting rules, normalization, and check-digit validation into safe, reusable types.

## Features

- **CPF** — numeric validation with optional mask (`XXX.XXX.XXX-XX`) and modulo 11 check digits
- **CNPJ** — legacy numeric format and the new **alphanumeric standard** (Receita Federal, from July 2026)
- Character and check-digit validation before normalization
- Typed custom errors identifiable via `instanceof` and `code`
- Zero runtime dependencies
- Full TypeScript support with exported types

## Installation

```bash
npm install @frani/values-object
```

```bash
pnpm add @frani/values-object
```

```bash
yarn add @frani/values-object
```

**Requirements:** Node.js 18+, ESM-compatible environment.

## Quick start

```typescript
import { CPF, CNPJ } from "@frani/values-object";

const cpf = CPF.create("390.533.447-05");
console.log(cpf.value); // "39053344705"

const cnpj = CNPJ.create("12.ABC.345/01DE-35");
console.log(cnpj.value); // "12ABC34501DE35"
```

## CPF

Accepts unformatted (`39053344705`) or masked (`390.533.447-05`) input.

```typescript
CPF.validate("390.533.447-05"); // true
CPF.validate("11111111111");      // false
CPF.validate("39053344705abc");   // false — invalid characters
```

## CNPJ

Supports both numeric legacy CNPJs and the new alphanumeric format.

| Format | Example |
| --- | --- |
| Alphanumeric (masked) | `12.ABC.345/01DE-35` |
| Alphanumeric (raw) | `12ABC34501DE35` |
| Legacy (masked) | `11.222.333/0001-81` |
| Legacy (raw) | `11222333000181` |

Letters are normalized to uppercase. Check digits follow the Receita Federal / SERPRO modulo 11 algorithm with ASCII-based character values.

## Error handling

```typescript
import {
  CPF,
  InvalidCPFError,
  InvalidCNPJError,
  ValuesObjectError,
} from "@frani/values-object";

try {
  CPF.create("111.111.111-11");
} catch (error) {
  if (error instanceof InvalidCPFError) {
    console.log(error.code);  // "INVALID_CPF"
    console.log(error.value); // "111.111.111-11"
  }
}
```

| Error | Code |
| --- | --- |
| `InvalidCPFError` | `INVALID_CPF` |
| `InvalidCNPJError` | `INVALID_CNPJ` |

All library errors extend `ValuesObjectError`.

## Development

```bash
npm install
npm run build
npm test
npm run test:coverage
```

### Scripts

| Script | Description |
| --- | --- |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run docs:dev` | Start local Mintlify documentation |

## Documentation

Full documentation lives in the [`documentation/`](./documentation) folder. Preview locally:

```bash
npm run docs:dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

ISC
