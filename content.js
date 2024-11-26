async function extractContacts() {
    const contacts = [];
    const elements = document.querySelectorAll("._3wQm1 ._1VzZY ._3ko75._5h6Y_._3Whw5");
  
    elements.forEach(element => {
      const phoneNumber = element.textContent.match(/\+\d+/);
      if (phoneNumber) {
        contacts.push({ number: phoneNumber[0] });
      }
    });
  
    if (contacts.length > 0) {
      generateExcelFile(contacts);
    } else {
      alert("No contacts found or unable to retrieve contact list. Open a group and try again.");
    }
  }
  
  function generateExcelFile(data) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");
  
    const wbOut = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbOut], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
  
    chrome.downloads.download({
      url: url,
      filename: "whatsapp_contacts.xlsx"
    });
  }
  
  extractContacts();
  