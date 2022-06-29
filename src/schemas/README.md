# Writing Schemas and Validators

When dealing with JSON objects that come from a network request or database, we
need to use schema validation. This has some similarities to Typescript type checking,
so we have chosen an approach where we generate schemas & validators from Typescript.

## Library usage:

The Typescript types are converted using https://github.com/vega/ts-json-schema-generator,
which has only partial support for Typescript features. So the schemas are using a limited
subset of what's possible.

The schema validation is done using [`ajv`](https://ajv.js.org/), and we use the standalone
validators- these are Javascript functions which get committed to source.

## To create a new schema

Create a file in the shared/src/schemas directory with name of a type. You can use comments
to control [properties of the schema](https://ajv.js.org/json-schema.html):

`MyType.ts`:

```typescript
export type MyType = {
  name: string;
  // @format uuid
  applicationId: string;
  // @type integer
  count: number;
};
```

After creating the type, you'll need to run `lerna run build --scope @superblocksteam/shared` to generate
the validator code. You should read the generated JSON Schema to confirm that it matches your
rules- this is not always easy.

You need to check in both of the files added to `packages/shared/src/jsonschemas`, which will be `MyType.ts`
and `MyTypeValidator.js` in this case.

## To use a schema validator

```typescript
import {
  validateMyType
} from '@superblocksteam/shared';

// This will throw an error if it's invalid
const myType = validateMyType(someObject);
```


