import { ICommonTable } from 'app/entities/modelConfig/common-table/common-table.model';

export const calculateTableWidth = (commonTable: ICommonTable): string => {
  if (!commonTable) {
    return '100%';
  }
  let tableWidth = 48 + 52; // Id和checkbox
  const fields = commonTable.commonTableFields;
  if (fields) {
    fields.forEach(field => {
      if (field.columnWidth) {
        if (!isNaN(field.columnWidth)) {
          tableWidth = tableWidth + field.columnWidth;
        } else {
          tableWidth = tableWidth + 100;
        }
      } else {
        tableWidth = tableWidth + 100;
      }
    });
  }
  const relationships = commonTable.relationships;
  if (relationships) {
    relationships.forEach(relationship => {
      if (relationship.columnWidth) {
        if (!isNaN(relationship.columnWidth)) {
          tableWidth = tableWidth + Number(relationship.columnWidth);
        } else {
          tableWidth = tableWidth + 100;
        }
      } else {
        tableWidth = tableWidth + 100;
      }
    });
  }
  return `${tableWidth}px`;
};

export const calculateRelationshipWidth = (commonTable: ICommonTable, relationshipName: string): string => {
  const relationshipData = commonTable.relationships?.find(field => field.relationshipName === relationshipName);
  if (!relationshipData) {
    return '100px';
  }
  const relationshipWidthValue = relationshipData.columnWidth;
  if (relationshipWidthValue) {
    if (!isNaN(Number(relationshipWidthValue))) {
      return `${relationshipWidthValue}px`;
    } else {
      return '100px';
    }
  } else {
    return '100px';
  }
};

export const calculateFieldWidth = (commonTable: ICommonTable, fieldName: string): string => {
  const fieldData = commonTable.commonTableFields?.find(field => field.entityFieldName === fieldName);
  if (!fieldData) {
    return '100px';
  }
  const fieldWithValue = fieldData.columnWidth;
  if (fieldWithValue) {
    if (!isNaN(fieldWithValue)) {
      return `${fieldWithValue}px`;
    } else {
      return '100px';
    }
  } else {
    return '100px';
  }
};
