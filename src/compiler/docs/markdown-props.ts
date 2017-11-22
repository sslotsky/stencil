import { MemberMeta } from '../../util/interfaces';
import { PROP_TYPE } from '../../util/constants';


export class MarkdownProps {
  private rows: Row[] = [];

  addRow(memberName: string, memberMeta: MemberMeta) {
    this.rows.push(new Row(memberName, memberMeta));
  }

  toMarkdown() {
    const content: string[] = [];
    if (!this.rows.length) {
      return content;
    }

    content.push(`## Properties`);
    content.push(``);

    this.rows = this.rows.sort((a, b) => {
      if (a.memberName < b.memberName) return -1;
      if (a.memberName > b.memberName) return 1;
      return 0;
    });

    this.rows.forEach(row => {
      content.push(...row.toMarkdown());
    });

    return content;
  }
}


class Row {

  constructor(public memberName: string, private memberMeta: MemberMeta) {}

  toMarkdown() {
    const content: string[] = [];

    content.push(`#### ${this.memberName}`);
    content.push(``);
    content.push(getPropType(this.memberMeta.propType));
    content.push(``);
    content.push(``);

    return content;
  }
}


function getPropType(propType: PROP_TYPE) {
  switch (propType) {
    case PROP_TYPE.Any:
      return 'any';
    case PROP_TYPE.Boolean:
      return 'boolean';
    case PROP_TYPE.Number:
      return 'number';
    case PROP_TYPE.String:
      return 'string';
  }
  return '';
}

