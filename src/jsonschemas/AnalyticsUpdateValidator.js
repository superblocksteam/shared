/* eslint-disable */
"use strict";export const validate = validate10;export default validate10;const schema11 = {"$schema":"http://json-schema.org/draft-07/schema#","$ref":"#/definitions/AnalyticsUpdate","definitions":{"AnalyticsUpdate":{"$ref":"#/definitions/AnalyticsDto"},"AnalyticsDto":{"type":"object","properties":{"checklist":{"$ref":"#/definitions/Checklist"},"recommendedDatasources":{"type":"array","items":{"type":"string"}}},"additionalProperties":false},"Checklist":{"type":"object","properties":{"tasks":{"type":"array","items":{"$ref":"#/definitions/OnboardingTask"}}},"required":["tasks"],"additionalProperties":false},"OnboardingTask":{"type":"object","properties":{"id":{"$ref":"#/definitions/TASKS"},"displayName":{"type":"string"},"viewed":{"type":"string","format":"date-time"},"completed":{"type":"string","format":"date-time"}},"required":["id"],"additionalProperties":false},"TASKS":{"anyOf":[{"$ref":"#/definitions/USER_TASKS"},{"$ref":"#/definitions/ORG_TASKS"}]},"USER_TASKS":{"type":"string","enum":["COMPLETE_SURVEY","VIEW_DEMO","VIEW_DEMO_VIDEO","DEPLOY_APP","INVITE_TEAMMATE","DEPLOY_WORKFLOW","DEPLOY_SCHEDULED_JOB"]},"ORG_TASKS":{"type":"string","const":"CONNECT_INTEGRATION"}}};const schema12 = {"type":"object","properties":{"checklist":{"$ref":"#/definitions/Checklist"},"recommendedDatasources":{"type":"array","items":{"type":"string"}}},"additionalProperties":false};const schema13 = {"type":"object","properties":{"tasks":{"type":"array","items":{"$ref":"#/definitions/OnboardingTask"}}},"required":["tasks"],"additionalProperties":false};const schema14 = {"type":"object","properties":{"id":{"$ref":"#/definitions/TASKS"},"displayName":{"type":"string"},"viewed":{"type":"string","format":"date-time"},"completed":{"type":"string","format":"date-time"}},"required":["id"],"additionalProperties":false};const schema15 = {"anyOf":[{"$ref":"#/definitions/USER_TASKS"},{"$ref":"#/definitions/ORG_TASKS"}]};const schema16 = {"type":"string","enum":["COMPLETE_SURVEY","VIEW_DEMO","VIEW_DEMO_VIDEO","DEPLOY_APP","INVITE_TEAMMATE","DEPLOY_WORKFLOW","DEPLOY_SCHEDULED_JOB"]};const schema17 = {"type":"string","const":"CONNECT_INTEGRATION"};function validate14(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){let vErrors = null;let errors = 0;const _errs0 = errors;let valid0 = false;const _errs1 = errors;if(typeof data !== "string"){let dataType0 = typeof data;let coerced0 = undefined;if(!(coerced0 !== undefined)){if(dataType0 == "number" || dataType0 == "boolean"){coerced0 = "" + data;}else if(data === null){coerced0 = "";}else {const err0 = {instancePath,schemaPath:"#/definitions/USER_TASKS/type",keyword:"type",params:{type: "string"},message:"must be string"};if(vErrors === null){vErrors = [err0];}else {vErrors.push(err0);}errors++;}}if(coerced0 !== undefined){data = coerced0;if(parentData !== undefined){parentData[parentDataProperty] = coerced0;}}}if(!(((((((data === "COMPLETE_SURVEY") || (data === "VIEW_DEMO")) || (data === "VIEW_DEMO_VIDEO")) || (data === "DEPLOY_APP")) || (data === "INVITE_TEAMMATE")) || (data === "DEPLOY_WORKFLOW")) || (data === "DEPLOY_SCHEDULED_JOB"))){const err1 = {instancePath,schemaPath:"#/definitions/USER_TASKS/enum",keyword:"enum",params:{allowedValues: schema16.enum},message:"must be equal to one of the allowed values"};if(vErrors === null){vErrors = [err1];}else {vErrors.push(err1);}errors++;}var _valid0 = _errs1 === errors;valid0 = valid0 || _valid0;if(!valid0){const _errs4 = errors;if(typeof data !== "string"){let dataType1 = typeof data;let coerced1 = undefined;if(!(coerced1 !== undefined)){if(dataType1 == "number" || dataType1 == "boolean"){coerced1 = "" + data;}else if(data === null){coerced1 = "";}else {const err2 = {instancePath,schemaPath:"#/definitions/ORG_TASKS/type",keyword:"type",params:{type: "string"},message:"must be string"};if(vErrors === null){vErrors = [err2];}else {vErrors.push(err2);}errors++;}}if(coerced1 !== undefined){data = coerced1;if(parentData !== undefined){parentData[parentDataProperty] = coerced1;}}}if("CONNECT_INTEGRATION" !== data){const err3 = {instancePath,schemaPath:"#/definitions/ORG_TASKS/const",keyword:"const",params:{allowedValue: "CONNECT_INTEGRATION"},message:"must be equal to constant"};if(vErrors === null){vErrors = [err3];}else {vErrors.push(err3);}errors++;}var _valid0 = _errs4 === errors;valid0 = valid0 || _valid0;}if(!valid0){const err4 = {instancePath,schemaPath:"#/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};if(vErrors === null){vErrors = [err4];}else {vErrors.push(err4);}errors++;validate14.errors = vErrors;return false;}else {errors = _errs0;if(vErrors !== null){if(_errs0){vErrors.length = _errs0;}else {vErrors = null;}}}validate14.errors = vErrors;return errors === 0;}const formats0 = require("ajv-formats/dist/formats").fullFormats["date-time"];function validate13(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){let vErrors = null;let errors = 0;if(errors === 0){if(data && typeof data == "object" && !Array.isArray(data)){let missing0;if((data.id === undefined) && (missing0 = "id")){validate13.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];return false;}else {const _errs1 = errors;for(const key0 in data){if(!((((key0 === "id") || (key0 === "displayName")) || (key0 === "viewed")) || (key0 === "completed"))){validate13.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];return false;break;}}if(_errs1 === errors){if(data.id !== undefined){const _errs2 = errors;if(!(validate14(data.id, {instancePath:instancePath+"/id",parentData:data,parentDataProperty:"id",rootData}))){vErrors = vErrors === null ? validate14.errors : vErrors.concat(validate14.errors);errors = vErrors.length;}var valid0 = _errs2 === errors;}else {var valid0 = true;}if(valid0){if(data.displayName !== undefined){let data1 = data.displayName;const _errs3 = errors;if(typeof data1 !== "string"){let dataType0 = typeof data1;let coerced0 = undefined;if(!(coerced0 !== undefined)){if(dataType0 == "number" || dataType0 == "boolean"){coerced0 = "" + data1;}else if(data1 === null){coerced0 = "";}else {validate13.errors = [{instancePath:instancePath+"/displayName",schemaPath:"#/properties/displayName/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}}if(coerced0 !== undefined){data1 = coerced0;if(data !== undefined){data["displayName"] = coerced0;}}}var valid0 = _errs3 === errors;}else {var valid0 = true;}if(valid0){if(data.viewed !== undefined){let data2 = data.viewed;const _errs5 = errors;if(typeof data2 !== "string"){let dataType1 = typeof data2;let coerced1 = undefined;if(!(coerced1 !== undefined)){if(dataType1 == "number" || dataType1 == "boolean"){coerced1 = "" + data2;}else if(data2 === null){coerced1 = "";}else {validate13.errors = [{instancePath:instancePath+"/viewed",schemaPath:"#/properties/viewed/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}}if(coerced1 !== undefined){data2 = coerced1;if(data !== undefined){data["viewed"] = coerced1;}}}if(errors === _errs5){if(errors === _errs5){if(typeof data2 === "string"){if(!(formats0.validate(data2))){validate13.errors = [{instancePath:instancePath+"/viewed",schemaPath:"#/properties/viewed/format",keyword:"format",params:{format: "date-time"},message:"must match format \""+"date-time"+"\""}];return false;}}}}var valid0 = _errs5 === errors;}else {var valid0 = true;}if(valid0){if(data.completed !== undefined){let data3 = data.completed;const _errs7 = errors;if(typeof data3 !== "string"){let dataType2 = typeof data3;let coerced2 = undefined;if(!(coerced2 !== undefined)){if(dataType2 == "number" || dataType2 == "boolean"){coerced2 = "" + data3;}else if(data3 === null){coerced2 = "";}else {validate13.errors = [{instancePath:instancePath+"/completed",schemaPath:"#/properties/completed/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}}if(coerced2 !== undefined){data3 = coerced2;if(data !== undefined){data["completed"] = coerced2;}}}if(errors === _errs7){if(errors === _errs7){if(typeof data3 === "string"){if(!(formats0.validate(data3))){validate13.errors = [{instancePath:instancePath+"/completed",schemaPath:"#/properties/completed/format",keyword:"format",params:{format: "date-time"},message:"must match format \""+"date-time"+"\""}];return false;}}}}var valid0 = _errs7 === errors;}else {var valid0 = true;}}}}}}}else {validate13.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];return false;}}validate13.errors = vErrors;return errors === 0;}function validate12(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){let vErrors = null;let errors = 0;if(errors === 0){if(data && typeof data == "object" && !Array.isArray(data)){let missing0;if((data.tasks === undefined) && (missing0 = "tasks")){validate12.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];return false;}else {const _errs1 = errors;for(const key0 in data){if(!(key0 === "tasks")){validate12.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];return false;break;}}if(_errs1 === errors){if(data.tasks !== undefined){let data0 = data.tasks;const _errs2 = errors;if(errors === _errs2){if(Array.isArray(data0)){var valid1 = true;const len0 = data0.length;for(let i0=0; i0<len0; i0++){const _errs4 = errors;if(!(validate13(data0[i0], {instancePath:instancePath+"/tasks/" + i0,parentData:data0,parentDataProperty:i0,rootData}))){vErrors = vErrors === null ? validate13.errors : vErrors.concat(validate13.errors);errors = vErrors.length;}var valid1 = _errs4 === errors;if(!valid1){break;}}}else {validate12.errors = [{instancePath:instancePath+"/tasks",schemaPath:"#/properties/tasks/type",keyword:"type",params:{type: "array"},message:"must be array"}];return false;}}}}}}else {validate12.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];return false;}}validate12.errors = vErrors;return errors === 0;}function validate11(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){let vErrors = null;let errors = 0;if(errors === 0){if(data && typeof data == "object" && !Array.isArray(data)){const _errs1 = errors;for(const key0 in data){if(!((key0 === "checklist") || (key0 === "recommendedDatasources"))){validate11.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];return false;break;}}if(_errs1 === errors){if(data.checklist !== undefined){const _errs2 = errors;if(!(validate12(data.checklist, {instancePath:instancePath+"/checklist",parentData:data,parentDataProperty:"checklist",rootData}))){vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);errors = vErrors.length;}var valid0 = _errs2 === errors;}else {var valid0 = true;}if(valid0){if(data.recommendedDatasources !== undefined){let data1 = data.recommendedDatasources;const _errs3 = errors;if(errors === _errs3){if(Array.isArray(data1)){var valid1 = true;const len0 = data1.length;for(let i0=0; i0<len0; i0++){let data2 = data1[i0];const _errs5 = errors;if(typeof data2 !== "string"){let dataType0 = typeof data2;let coerced0 = undefined;if(!(coerced0 !== undefined)){if(dataType0 == "number" || dataType0 == "boolean"){coerced0 = "" + data2;}else if(data2 === null){coerced0 = "";}else {validate11.errors = [{instancePath:instancePath+"/recommendedDatasources/" + i0,schemaPath:"#/properties/recommendedDatasources/items/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}}if(coerced0 !== undefined){data2 = coerced0;if(data1 !== undefined){data1[i0] = coerced0;}}}var valid1 = _errs5 === errors;if(!valid1){break;}}}else {validate11.errors = [{instancePath:instancePath+"/recommendedDatasources",schemaPath:"#/properties/recommendedDatasources/type",keyword:"type",params:{type: "array"},message:"must be array"}];return false;}}var valid0 = _errs3 === errors;}else {var valid0 = true;}}}}else {validate11.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];return false;}}validate11.errors = vErrors;return errors === 0;}function validate10(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){let vErrors = null;let errors = 0;if(!(validate11(data, {instancePath,parentData,parentDataProperty,rootData}))){vErrors = vErrors === null ? validate11.errors : vErrors.concat(validate11.errors);errors = vErrors.length;}validate10.errors = vErrors;return errors === 0;}