export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = [];
    this.current = null;
  }
  select($el) {
    this.clearSelect();
    $el.focus().addClass(TableSelection.className);
    this.group.push($el);
    this.current = $el;
  }
  clearSelect() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group = [];
  }
  selectGroup($group = []) {
    this.clearSelect();
    this.group = $group;
    this.group.forEach(($el) => $el.addClass(TableSelection.className));
  }
}
