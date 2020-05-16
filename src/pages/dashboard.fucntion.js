import {storage} from '@core/utils';

function toHtml(key) {
  const objTable = storage(key);
  const date = new Date(objTable.dateOpened).toLocaleDateString();
  const time = new Date(objTable.dateOpened).toLocaleTimeString();
  const id = key.split(':')[1];
  return `
    <li class="db__record">
        <a href="#excel/${id}">${objTable.title}</a>
        <strong>${date} | ${time}</strong>
    </li>
  `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i ++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>У Вас нет таблиц.</p>`;
  }
  return `
     <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
     </div>
  
      <div class="db__list">
        ${keys.map(toHtml).join('')}
      </div>
`;
}


