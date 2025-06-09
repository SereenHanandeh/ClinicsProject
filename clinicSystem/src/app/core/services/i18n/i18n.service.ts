import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  currentLanguage: 'en' | 'ar' = 'en';
  translations: Record<string, any> | null = null;

  constructor(private httpClient: HttpClient) {}

  async loadTranslations(lang: 'en' | 'ar') {
    if (this.translations && this.currentLanguage === lang) {
      return this.translations;
    }

    try {
      const translationsFile = `assets/i18n/${lang}.json`;
      this.translations = await firstValueFrom(
        this.httpClient.get<Record<string, any>>(translationsFile)
      );

      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

      return this.translations;
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      return null;
    }
  }

  setLanguage(language: 'en' | 'ar') {
    this.currentLanguage = language;
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }

  getLanguage() {
    return this.currentLanguage;
  }

  t(key: string): string {
    if (!this.translations) {
      return key; // لو الترجمة غير محملة ارجع المفتاح نفسه
    }

    const keys = key.split('.');
    let value: any = this.translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined || value === null) {
        return key; // لو المفتاح غير موجود ارجع المفتاح نفسه
      }
    }

    return value;
  }
}
