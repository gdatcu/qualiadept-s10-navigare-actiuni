// Inspector Hygiene Policy: verifică fișierele de test înainte de commit sau de Submit.
// Folosire: node scripts/check-hygiene.mjs [fișiere sau foldere...]  (implicit: tests/)
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const REGULI = [
  { regex: /\bpage\.pause\s*\(/, mesaj: 'pauză de debug uitată' },
  { regex: /\bwaitForTimeout\s*\(/, mesaj: 'hard wait' },
  { regex: /\bforce\s*:\s*true\b/, mesaj: 'acțiune forțată' },
  { regex: /\.goto\(\s*['"`]https?:\/\//, mesaj: 'adresă absolută în goto()' },
  { regex: /expect\(\s*await\b/, mesaj: 'asertare care nu reîncearcă' },
];
// Folderele cu greșeli intenționate (laboratorul de debugging, starter-ul temei)
const IGNORATE_IMPLICIT = ['debug-lab', 'tema'];

const colecteaza = (cale, explicit) => {
  if (statSync(cale).isFile()) return /\.(spec|test)\.ts$/.test(cale) || explicit ? [cale] : [];
  return readdirSync(cale)
    .filter((nume) => explicit || !IGNORATE_IMPLICIT.includes(nume))
    .flatMap((nume) => colecteaza(join(cale, nume), false));
};

const argumente = process.argv.slice(2);
const fisiere = (argumente.length ? argumente : ['tests'])
  .flatMap((cale) => colecteaza(cale, argumente.length > 0));

let probleme = 0;
for (const fisier of fisiere) {
  readFileSync(fisier, 'utf8').split(/\r?\n/).forEach((linie, i) => {
    for (const { regex, mesaj } of REGULI) {
      if (regex.test(linie)) {
        probleme++;
        console.log(`❌ ${fisier}:${i + 1}  ${mesaj}  →  ${linie.trim()}`);
      }
    }
  });
}
console.log(probleme ? `\n${probleme} problemă(e) găsite.` : `✅ ${fisiere.length} fișiere verificate, nicio problemă.`);
process.exit(probleme ? 1 : 0);
