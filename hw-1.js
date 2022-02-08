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
  const sourceIndex = this.findIndex((folder) => {
    if (folder.files && folder.files.some((file) => (file.id === fileId ? true : false))) {
      return true;
    }
  });

  if (sourceIndex === -1) {
    alert(`no file or folder found with these Ids ${fileId}, ${folderId}`);
    return;
  } else {
    const fileIndex = this[sourceIndex].files.findIndex((file) => file.id === fileId);

    const file = this[sourceIndex].files.find((file) => file.id === fileId);

    this.some((folder) => {
      if (folder.id === folderId && folder.files) {
        folder.files.push(file);
        return true;
      } else if (folder.id === folderId && !folder.files) {
        folder.files = [];
        folder.files.push(file);
        return true;
      } else return false;
    });

    this[sourceIndex].files.splice(fileIndex, 1);
  }
};

// ------------------------------------------------------------------------------

// COPY

Array.prototype.copy = function (fileId, folderId) {
  const sourceIndex = this.findIndex((folder) => {
    if (folder.files && folder.files.some((file) => (file.id === fileId ? true : false))) {
      return true;
    }
  });

  if (sourceIndex === -1) {
    alert(`no file or folder found with this Id`);
    return;
  } else {
    const file = this[sourceIndex].files.find((file) => file.id === fileId);

    this.some((folder) => {
      if (folder.id === folderId && folder.files) {
        folder.files.push(file);
        return true;
      } else if (folder.id === folderId && !folder.files) {
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
  const foldersIncludeTheSameFileIndexNumbers = [];
  let errorCheck = 0;
  this.forEach((folder, index) => {
    if (folder.files && folder.files.some((file) => (file.id === fileId ? true : false))) {
      foldersIncludeTheSameFileIndexNumbers.push(index);
    } else {
      errorCheck += 1;
    }
  });

  if (this.length === errorCheck) {
    alert(`no file found with this Id of ${fileId}`);
    return;
  } else {
    foldersIncludeTheSameFileIndexNumbers.forEach((indexNumber) => {
      let fileIndex = this[indexNumber].files.findIndex((file) => file.id === fileId);
      this[indexNumber].files.splice(fileIndex, 1);
    });
  }
};

// ------------------------------------------------------------------------------

// REMOVE FOLDER

Array.prototype.removeFolder = function (folderId) {
  const folderToDeleteId = this.findIndex((folder) => {
    if (folder.id === folderId) {
      return true;
    } else return false;
  });

  if (folderToDeleteId === -1) {
    alert(`no folder found with id of ${folderId}`);
    return;
  } else {
    this.splice(folderToDeleteId, 1);
  }
};

// ------------------------------------------------------------------------------

// PARENT FOLDER OF

Array.prototype.parentFolderOf = function (fileId) {
  const parentFolderId = [];
  const foldersIncludeTheSameFileIndexNumbers = [];
  let errorCheck = 0;
  this.forEach((folder, index) => {
    if (folder.files && folder.files.some((file) => (file.id === fileId ? true : false))) {
      foldersIncludeTheSameFileIndexNumbers.push(index);
    } else {
      errorCheck += 1;
    }
  });

  if (this.length === errorCheck) {
    alert(`no file found with this Id of ${fileId}`);
    return;
  } else {
    foldersIncludeTheSameFileIndexNumbers.forEach((indexNumber) => {
      parentFolderId.push(this[indexNumber].id);
    });

    return parentFolderId.join(', ');
  }
};

folders.move(17, 6); // dosyayı klasöre taşıyacak
folders.copy(18, 7); // kopyasını oluşturacak
folders.remove(17); // dosyayı silecek
folders.removeFolder(6); //klasörü ve altındaki tüm dosyaları silecek
folders.parentFolderOf(17); // ==> 5
