const GoogleDrive = function (credentials = "default") {
	const GoogleAPIs = require("./googleAPIs.js");
	this.general = new GoogleAPIs(credentials);
	this.drive = {}
}

GoogleDrive.prototype.read_folder = function (folder_id) {
	let instance = this;
	return new Promise(function (resolve, reject) {
		instance.drive.files.list({ q: `'${folder_id}' in parents` }, (err, res) => {
			if (err) { return reject(err) };
			resolve(res.data.files);
		});
	});
}

GoogleDrive.prototype.read_webView = function (file_id) {
	let instance = this;
	return new Promise(function (resolve, reject) {
		instance.drive.files.get({ fileId: file_id, fields: 'webViewLink' }, (err, res) => {
			if (err) { return reject(err) };
			resolve(res.data.webViewLink);
		});
	});
}

GoogleDrive.prototype.permissions_on = function (file_id) {
	let instance = this;
	return new Promise(function (resolve, reject) {
		instance.drive.permissions.create({ fileId: file_id, requestBody: { role: 'reader', type: 'anyone', } }, (err) => {
			if (err) { return reject(err) };
			resolve('success');
		});
	});
}

GoogleDrive.prototype.upload = function (folder_id, file) {
	let instance = this;
	let fs = require('fs');
	return new Promise(function (resolve, reject) {
		instance.drive.files.create({
			resource: { name: (file.split('/'))[file.split('/').length - 1], parents: [ folder_id ], },
			media: { body: fs.createReadStream(file), },
			fields: 'id',
		}, (err, file) => {
			if (err) { reject(err); }
			else {
				resolve(file.data.id);
			}
		});
	});
}

GoogleDrive.prototype.upload_andView = async function (folder_id, file) {
	let instance = this;
	try {
		this.drive = await this.general.get_app("drive");
		let id = await this.upload(folder_id, file);
		await this.permissions_on(id);
		return (await this.read_webView(id));
	} catch (e) {
		console.log(e.message);
	}
}

GoogleDrive.prototype.makeFolder = function (folderName) {
	let instance = this;
	let fileMetadata = {
		'name': folderName,
		'mimeType': 'application/vnd.google-apps.folder'
	};
	return new Promise(function (resolve, reject) {
		instance.drive.files.create({
      resource: fileMetadata,
      fields: 'id'
    }, function (err, file) {
      if (err) {
        reject(err);
      } else {
				resolve(file.data.id);
      }
    });
	});
}

GoogleDrive.prototype.moveFolder = function (targetId, parent) {
	let instance = this;
	return new Promise(function (resolve, reject) {
      let fileId = targetId;
      let folderId = parent;
      instance.drive.files.get({
        fileId: fileId,
        fields: 'parents'
      }, function (err, file) {
        if (err) {
          reject(err);
        } else {
          let previousParents = file.data.parents.join(',');
          instance.drive.files.update({
            fileId: fileId,
            addParents: folderId,
            removeParents: previousParents,
            fields: 'id, parents'
          }, function (err, file) {
            if (err) {
              reject(err);
            } else {
              resolve(targetId);
            }
          });
        }
      });
	});
}

GoogleDrive.prototype.makeFolder_andMove = async function (folderName, parent) {
	let instance = this;
	try {
		this.drive = await this.general.get_app("drive");
		let id = await this.makeFolder(folderName);
		return (await this.moveFolder(id, parent));
	} catch (e) {
		console.log(e.message);
	}
}

module.exports = GoogleDrive;
