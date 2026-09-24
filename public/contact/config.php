<?php
// 本番切替時はこのファイルの値だけを差し替える

const RECAPTCHA_SECRET_KEY = '6LcX3cwtAAAAANuQXRc9LIeQ3YVykojP3cSzPAUz';
// 通知先（フォームごとに個別）
// TODO: 確認後 info@2nd-inc.com に戻す
const NOTIFY_TO_CONTACT = 'a2c0725@gmail.com';
// 仮の通知先（本番切替時に差し替える）
const NOTIFY_TO_RESIDENT = 'a2c0725@gmail.com';
const NOTIFY_TO_CANCELLATION = 'a2c0725@gmail.com';
const NOTIFY_FROM = 'no-reply@2nd-inc.com';
