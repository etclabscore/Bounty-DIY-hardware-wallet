export default function(type, data, name) {
  const el = document.createElement('a');
  el.download = name;
  el.href = `data:${type};charset=UTF-8,${encodeURIComponent(data)}`;

  const ev = new MouseEvent('click');
  el.dispatchEvent(ev);
}
