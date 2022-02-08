const folders = [
  {
    id: 5,
    name: 'Klasör 1',
    files: [
      { id: 17, name: 'profil.jpg' },
      { id: 18, name: 'manzara.jpg' },
    ],
  },
  {
    id: 6,
    name: 'Klasör 2',
    files: [
      { id: 21, name: 'foto.png' },
      { id: 22, name: 'dosya.xls' },
      { id: 18, name: 'manzara.jpg' },
    ],
  },
  {
    id: 7,
    name: 'Klasör 3',
  },
];

// İstenen methodlarda copy olduğu için, bütün methodları bir file'ın başka bir veya birden fazla folder'da kopyasının var olabileceğini düşünerek oluşturdum, bu yüzden 18 id'li file'ın bir kopyasını Klasör 2'ye de atadım.

// MOVE
Array.prototype.move = function (fileId, folderId) {
  // Find the index number of the folder of the file which is going to be moved
  const sourceIndex = this.findIndex((folder) => {
    if (folder.files && folder.files.some((file) => (file.id === fileId ? true : false))) {
      return true;
    }
  });

  // Error Handle
  if (sourceIndex === -1) {
    alert(`no file or folder found with these Ids ${fileId}, ${folderId}`);
    return;
  } else {
    // Find the index number of the file which is going to be moved
    const fileIndex = this[sourceIndex].files.findIndex((file) => file.id === fileId);
    // Take a copy of the file which is going to be moved
    const file = this[sourceIndex].files.find((file) => file.id === fileId);

    this.some((folder) => {
      if (folder.id === folderId && folder.files) {
        // Move the file to the target folder
        folder.files.push(file);
        return true;
      } else if (folder.id === folderId && !folder.files) {
        // Create target files prop (if not exist) and move the file to the target folder
        folder.files = [];
        folder.files.push(file);
        return true;
      } else return false;
    });
    // Delete the file from the source folder
    this[sourceIndex].files.splice(fileIndex, 1);
  }
};

// ------------------------------------------------------------------------------

// COPY

Array.prototype.copy = function (fileId, folderId) {
  // Find the index number of the folder of the file which is going to be copied
  const sourceIndex = this.findIndex((folder) => {
    if (folder.files && folder.files.some((file) => (file.id === fileId ? true : false))) {
      return true;
    }
  });
  // Error Handle
  if (sourceIndex === -1) {
    alert(`no file or folder found with this Id`);
    return;
  } else {
    // Take a copy of the file which is going to be copied
    const file = this[sourceIndex].files.find((file) => file.id === fileId);

    this.some((folder) => {
      if (folder.id === folderId && folder.files) {
        // Copy the file to the target folder
        folder.files.push(file);
        return true;
      } else if (folder.id === folderId && !folder.files) {
        // Create target files prop (if not exist) and copy the file to the target folder
        folder.files = [];
        folder.files.push(file);
        return true;
      } else return false;
    });
  }
};

// ------------------------------------------------------------------------------

// REMOVE

Array.prototype.remove = function (fileId) {
  // Keep index numbers in an array of the folders which includes the same file
  const foldersIncludeTheSameFileIndexNumbers = [];
  let errorCheck = 0;
  this.forEach((folder, index) => {
    if (folder.files && folder.files.some((file) => (file.id === fileId ? true : false))) {
      foldersIncludeTheSameFileIndexNumbers.push(index);
    } else {
      errorCheck += 1;
    }
  });

  // Error Handle
  if (this.length === errorCheck) {
    alert(`no file found with this Id of ${fileId}`);
    return;
  } else {
    foldersIncludeTheSameFileIndexNumbers.forEach((indexNumber) => {
      // Find index number of the file to be removed
      let fileIndex = this[indexNumber].files.findIndex((file) => file.id === fileId);
      // Remove the file from the different folders(if the file is copied to other folders)
      this[indexNumber].files.splice(fileIndex, 1);
    });
  }
};

// ------------------------------------------------------------------------------

// REMOVE FOLDER

Array.prototype.removeFolder = function (folderId) {
  // Find the id of the folder to be deleted
  const folderToDeleteId = this.findIndex((folder) => {
    if (folder.id === folderId) {
      return true;
    } else return false;
  });
  // Error Handle
  if (folderToDeleteId === -1) {
    alert(`no folder found with id of ${folderId}`);
    return;
  } else {
    // Remove folder from the folders array
    this.splice(folderToDeleteId, 1);
  }
};

// ------------------------------------------------------------------------------

// PARENT FOLDER OF

Array.prototype.parentFolderOf = function (fileId) {
  // Keep the ids together of the folders which includes the same file
  const parentFolderId = [];
  // Keep the folders' index numbers together which includes the same file
  const foldersIncludeTheSameFileIndexNumbers = [];
  let errorCheck = 0;
  // Find the folders' index numbers which includes the same file
  this.forEach((folder, index) => {
    if (folder.files && folder.files.some((file) => (file.id === fileId ? true : false))) {
      foldersIncludeTheSameFileIndexNumbers.push(index);
    } else {
      errorCheck += 1;
    }
  });
  // Error Handle
  if (this.length === errorCheck) {
    alert(`no file found with this Id of ${fileId}`);
    return;
  } else {
    // Get the parent folder ids together
    foldersIncludeTheSameFileIndexNumbers.forEach((indexNumber) => {
      parentFolderId.push(this[indexNumber].id);
    });
    // Return parent folder ids
    return parentFolderId.join(', ');
  }
};

folders.move(17, 6); // dosyayı klasöre taşıyacak
folders.copy(18, 7); // kopyasını oluşturacak
folders.remove(17); // dosyayı silecek
folders.removeFolder(6); //klasörü ve altındaki tüm dosyaları silecek
folders.parentFolderOf(17); // ==> 5
