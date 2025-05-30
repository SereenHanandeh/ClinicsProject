import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { translation } from '../../../../assets/i18n/translation';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

 constructor(private httpClient: HttpClient) {}

  currentLanguage: 'en' | 'ar' = 'en';
  translations: Record<string, any> | null = null;

  async loadTranslations(lang: 'en' | 'ar') {
    if (this.translations) {
      return this.translations;
    }

    try {
      const translationsFile = `assets/i18n/${lang}.json`;
      console.log(`Loading translations from: ${translationsFile}`); 

      this.translations = await firstValueFrom(
        this.httpClient.get(translationsFile)
      );

      console.log('Loaded translations:', this.translations);

      this.currentLanguage = lang;

      return this.translations;
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      return null;
    }
  }

  setLanguage(language: 'en' | 'ar') {
    this.currentLanguage = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }

  getLanuage() {
    return this.currentLanguage;
  }

  t(key: string): string {
    const keys = key.split('.');
    let value: any = translation[this.currentLanguage];

    for (const k of keys) {
      value = value?.[k];
      if (!value) return key;
    }

    return value;
  }
}
