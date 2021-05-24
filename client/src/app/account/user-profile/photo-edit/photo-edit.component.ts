import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/shared/_models/member';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { UserToken } from 'src/app/shared/_models/user';
import { AccountService } from '../../account.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Photo } from 'src/app/shared/_models/photo';
import { UserService } from '../user.service';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {
  baseUrl = environment.apiUrl;
  @Input() member: Member;
  user: UserToken;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;

  constructor(private accountService: AccountService, private userService: UserService, private toastr: ToastrService,) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      // we are using bearer token to be sent
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);

        if (this.member.photoUrl == null) {
          this.userService.getUserMainPhotoUrl().subscribe((photo: Photo) => {
            this.member.photoUrl = photo.url;
            this.user.photoUrl = photo.url;
            this.accountService.setCurrentUser(this.user);
          })
          
        }

      }
    }

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.toastr.error(response);
    }
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(photo.id).subscribe(() => {
      // setting the current user's profile pic to the current photo
      this.user.photoUrl = photo.url;
      // updating current user from account service
      this.accountService.setCurrentUser(this.user);
      // updating the member object of its photoUrl (profile picture)
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        // if the photo is main, then set it to false
        if (p.isMain)
          p.isMain = false;
        // if found the photo inside photos which is equals to the current photo which has been set to profile picture
        // then set isMain to true
        if (p.id === photo.id)
          p.isMain = true;
      })
    })
  }

  deletePhoto(photoId: number) {
    this.userService.deletePhoto(photoId).subscribe(() => {
      this.member.photos.forEach(p => {
        if (p.isMain) {
          if (p.id === photoId) {
            this.member.photoUrl = null;
            this.user.photoUrl = null;
            this.accountService.setCurrentUser(this.user);
          }
        }
      })

      // reseting the photos of member object and removing the deleted id from photos array
      this.member.photos = this.member.photos.filter(x => x.id !== photoId);
    })
  }
}
