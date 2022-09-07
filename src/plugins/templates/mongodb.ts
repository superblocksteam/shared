import { EditorLanguage, FormComponentType, Plugin, PluginResponseType, PluginType } from '../../types';

export const MongoDBPluginVersions = {
  V1: '0.0.1'
};

export enum MongoDBOperationType {
  aggregate = 'aggregate',
  count = 'count',
  deleteOne = 'deleteOne',
  deleteMany = 'deleteMany',
  distinct = 'distinct',
  find = 'find',
  findOne = 'findOne',
  insertOne = 'insertOne',
  insertMany = 'insertMany',
  listCollections = 'listCollections',
  replaceOne = 'replaceOne',
  updateOne = 'updateOne',
  updateMany = 'updateMany'
}

export const MongoDBPlugin: Plugin = {
  id: 'mongodb',
  name: 'MongoDB',
  moduleName: 'MongoDBPlugin',
  modulePath: 'plugins/mongodb/MongoDBPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/mongodb.png',
  type: PluginType.DB,
  responseType: PluginResponseType.JSON,
  hasRawRequest: true,
  rawRequestName: 'Executed Operation',
  datasourceTemplate: {
    sections: [
      {
        name: 'main',
        items: [
          {
            label: 'Display Name',
            name: 'name',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            rules: [{ required: true, message: 'Display Name is required' }]
          },
          {
            label: 'Connection URI',
            name: 'endpoint.host',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'mongodb+srv://<username>:<password>@<host>/?retryWrites=true&w=majority',
            rules: [{ required: true, message: 'Connection URI is required' }],
            tooltip: {
              markdownText:
                'Connection URI used to connect to a MongoDB deployment. Format: ' +
                '`mongodb+srv://<username>:<password>@<host>/?retryWrites=true&w=majority` ' +
                '[Connection URI Docs](https://docs.mongodb.com/manual/reference/connection-string/)'
            }
          },
          {
            label: 'Database Name',
            name: 'authentication.custom.databaseName.value',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            rules: [{ required: true, message: 'Database Name is required' }]
          }
        ]
      }
    ]
  },
  actionTemplate: {
    sections: [
      {
        name: 'main',
        items: [
          {
            label: 'Operation',
            name: 'action',
            startVersion: MongoDBPluginVersions.V1,
            initialValue: MongoDBOperationType.find,
            componentType: FormComponentType.DROPDOWN,
            options: Object.values(MongoDBOperationType).map((op: string) => {
              return { key: op, value: op };
            }),
            tooltip: {
              markdownText:
                'Operations supported by MongoDB. [Operation Docs](https://docs.mongodb.com/manual/core/transactions-operations/)'
            },
            showSearch: true
          },
          {
            label: 'Collection',
            name: 'resource',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
            display: {
              show: {
                action: Object.values(MongoDBOperationType).reduce(
                  (acc: MongoDBOperationType[], ele) => (ele !== MongoDBOperationType.listCollections ? acc.concat(ele) : acc),
                  []
                )
              }
            },
            tooltip: {
              markdownText:
                'Collection is a grouping of MongoDB documents. [Collection Docs](https://docs.mongodb.com/manual/core/databases-and-collections/#collections)'
            }
          },
          {
            label: 'Field',
            name: 'field',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
            display: {
              show: {
                action: [MongoDBOperationType.distinct]
              }
            },
            tooltip: {
              markdownText:
                'The field for which to return distinct values. [Distinct Docs](https://docs.mongodb.com/manual/reference/method/db.collection.distinct/)'
            }
          },
          {
            label: 'Pipeline',
            name: 'pipeline',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            placeholder: `[
  { $match: { status: "active" } },
  { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
]`,
            display: {
              show: {
                action: [MongoDBOperationType.aggregate]
              }
            },
            tooltip: {
              markdownText:
                'An aggregation pipeline consists of one or more stages that process documents. [Pipeline Docs](https://docs.mongodb.com/manual/core/aggregation-pipeline/)'
            }
          },
          {
            label: 'Query',
            name: 'query',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            placeholder: `{ { $oid: '6161dc297f58812dd06ca190' }, qty: 5 }`,
            display: {
              show: {
                action: [MongoDBOperationType.count, MongoDBOperationType.distinct, MongoDBOperationType.find, MongoDBOperationType.findOne]
              }
            },
            tooltip: {
              markdownText: 'Query used in MongoDB operations. [Query Docs](https://docs.mongodb.com/manual/tutorial/query-documents/)'
            }
          },
          {
            label: 'Projection',
            name: 'projection',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            placeholder: `{ _id: 1, name: 0 }`,
            display: {
              show: {
                action: [MongoDBOperationType.find, MongoDBOperationType.findOne]
              }
            },
            tooltip: {
              markdownText:
                'Projection determines which fields are returned in the matching documents. [Projection Docs](https://docs.mongodb.com/manual/reference/method/db.collection.find/#std-label-method-find-projection)'
            }
          },
          {
            label: 'Sort By',
            name: 'sortby',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            placeholder: `{ _id: 1, name: 1 }`,
            display: {
              show: {
                action: [MongoDBOperationType.find]
              }
            },
            tooltip: {
              markdownText:
                'Sort the results. [Sort Docs](https://docs.mongodb.com/manual/reference/method/cursor.sort/#mongodb-method-cursor.sort)'
            }
          },
          {
            label: 'Limit',
            name: 'limit',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
            display: {
              show: {
                action: [MongoDBOperationType.find]
              }
            },
            tooltip: {
              markdownText:
                'Specify the maximum number of documents the cursor will return. [Limit Docs](https://docs.mongodb.com/manual/reference/method/cursor.limit/)'
            }
          },
          {
            label: 'Skip',
            name: 'skip',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
            display: {
              show: {
                action: [MongoDBOperationType.find]
              }
            },
            tooltip: {
              markdownText:
                'Method on a cursor to control where MongoDB begins returning results. [Skip Docs](https://docs.mongodb.com/manual/reference/method/cursor.skip/)'
            }
          },
          {
            label: 'Document',
            name: 'document',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            display: {
              show: {
                action: [MongoDBOperationType.insertOne, MongoDBOperationType.insertMany]
              }
            },
            tooltip: {
              markdownText:
                'A document to insert into the collection. [Insert Docs](https://docs.mongodb.com/manual/reference/method/db.collection.insert/)'
            }
          },
          {
            label: 'Filter',
            name: 'filter',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            placeholder: `{ { $oid: '6161dc297f58812dd06ca190' }, qty: 5 }`,
            display: {
              show: {
                action: [
                  MongoDBOperationType.deleteOne,
                  MongoDBOperationType.deleteMany,
                  MongoDBOperationType.listCollections,
                  MongoDBOperationType.replaceOne,
                  MongoDBOperationType.updateOne,
                  MongoDBOperationType.updateMany
                ]
              }
            },
            tooltip: {
              markdownText:
                'The filter is a document that specifies the condition for matching the document to operate. You can use [Query Operators](https://docs.mongodb.com/manual/reference/operator/)'
            }
          },
          {
            label: 'Replacement',
            name: 'replacement',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            display: {
              show: {
                action: [MongoDBOperationType.replaceOne]
              }
            },
            tooltip: {
              markdownText:
                'The replacement document. [ReplaceOne Docs](https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/)'
            }
          },
          {
            label: 'Update',
            name: 'update',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            placeholder: '{ $set: { status: "modified", comments: [ "$feedback1" ] } }',
            display: {
              show: {
                action: [MongoDBOperationType.updateOne, MongoDBOperationType.updateMany]
              }
            },
            tooltip: {
              markdownText:
                'The modifications to apply. [Update Docs](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/)'
            }
          },
          {
            label: 'Options',
            name: 'options',
            startVersion: MongoDBPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            display: {
              show: {
                action: [
                  MongoDBOperationType.aggregate,
                  MongoDBOperationType.count,
                  MongoDBOperationType.distinct,
                  MongoDBOperationType.replaceOne,
                  MongoDBOperationType.updateOne,
                  MongoDBOperationType.updateMany
                ]
              }
            }
            //TODO: Options can be different on different operation type. Make this dynamic based on selected operation.
            // One field (e.g., tooltip, placebolder...) can be dependent on the value of a different field, maybe create a new prop for this cause.
          }
        ]
      }
    ]
  }
};
