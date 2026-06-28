const fs = require('fs');
const path = require('path');

const srcDir = 'e:/Flyweis technology/Mr-Team-up-Sarath-Frontend/Mr-Sarath-Team-Up-Admin-Frontend-main/Mr-Sarath-Team-Up-Admin-Frontend-main/src';
const modalsDir = path.join(srcDir, 'components/ManageHeader');
const formsDir = path.join(srcDir, 'pages/ManageHeader/forms');

if (!fs.existsSync(formsDir)) fs.mkdirSync(formsDir, { recursive: true });

const filesToConvert = [
  { in: 'SubItemModal.tsx', out: 'GameForm.tsx', compName: 'GameForm' },
  { in: 'GroupActivitySubItemModal.tsx', out: 'GroupActivityForm.tsx', compName: 'GroupActivityForm' },
  { in: 'TeamPartiesSubItemModal.tsx', out: 'TeamPartiesForm.tsx', compName: 'TeamPartiesForm' },
  { in: 'BoomBundleSubItemModal.tsx', out: 'BoomBundleForm.tsx', compName: 'BoomBundleForm' },
  { in: 'QueensNightSubItemModal.tsx', out: 'QueensNightForm.tsx', compName: 'QueensNightForm' }
];

filesToConvert.forEach(f => {
  let content = fs.readFileSync(path.join(modalsDir, f.in), 'utf-8');
  
  // Replace Component Name
  content = content.replace(new RegExp(f.in.replace('.tsx', ''), 'g'), f.compName);
  
  // Replace isOpen logic
  content = content.replace(/isOpen: boolean;\n/g, '');
  content = content.replace(/isOpen,\s*/g, '');
  content = content.replace(/if \(!isOpen\) return null;/g, '');
  content = content.replace(/if \(isOpen && initialData\) {/g, 'if (initialData) {');
  content = content.replace(/} else if \(isOpen && !initialData\) {/g, '} else if (!initialData) {');
  
  // Remove modal wrapper classes
  content = content.replace(/<div className="fixed inset-0 bg-black\/(60|70) backdrop-blur-sm flex items-center justify-center z-50 p-4">/g, '<div>');
  content = content.replace(/<div className="bg-\[#(1A1A1A|1C1C1C)\] rounded-(xl|2xl) border border-\[#3A3530\] w-full max-w-(2xl|3xl|4xl) max-h-\[(90|92)vh\] overflow-hidden flex flex-col( shadow-2xl)?\">/g, '<div className="bg-[#1C1C1C] rounded-xl border border-[#3A3530] w-full max-w-4xl overflow-hidden flex flex-col mx-auto">');
  
  // Fix SubItemModal which uses isOpen directly
  if (f.in === 'SubItemModal.tsx') {
      content = content.replace(/if \(isOpen\) {/g, 'if (true) {');
  }

  // Save to forms dir
  fs.writeFileSync(path.join(formsDir, f.out), content);
});

console.log('Done converting modals to forms!');
